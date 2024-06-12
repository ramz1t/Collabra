import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../index'
import AvatarEditor from 'react-avatar-editor'
import { IoImageOutline, IoTrashOutline, IoSaveOutline } from 'react-icons/io5'
import { MdOutlineHideImage } from 'react-icons/md'
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs'
import { MutateOptions, UseMutateAsyncFunction } from '@tanstack/react-query'

export interface ImageEditorProps {
    initialImageComponent?: React.ReactElement
    initialImageExists?: boolean
    onSaveField: string
    onSave: UseMutateAsyncFunction<
        Record<string, any>,
        Error,
        Record<string, any>,
        unknown
    >
}

const ImageEditor = ({
    initialImageComponent,
    initialImageExists,
    onSave,
    onSaveField = 'image',
}: ImageEditorProps): React.ReactElement => {
    const { t } = useTranslation()
    const [inputImage, setInputImage] = useState<File | null>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const editorRef = useRef<AvatarEditor>(null)
    const [scale, setScale] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const openImageInput = useCallback(
        () => imageInputRef.current && imageInputRef.current.click(),
        [imageInputRef]
    )

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files: FileList | null = e.target.files
        if (files && files.length > 0) {
            setInputImage(files[0])
        } else {
            setInputImage(null)
        }
    }

    const closeEditor = (): void => {
        setInputImage(null)
        setScale(1)
        setRotation(0)
    }

    const saveChanges = (): void => {
        setIsSaving(true)

        // Creating and initializing HTMLImageElement from AvatarEditorData
        const img = new Image()
        img.src = editorRef.current?.getImage().toDataURL() || ''
        img.onload = () => {
            // Creating HTMLCanvas and resizing the image
            const canvas = document.createElement('canvas')
            canvas.width = 600
            canvas.height = 600
            const ctx = canvas.getContext('2d')
            if (!ctx) throw new Error('No 2d context found')
            ctx.drawImage(img, 0, 0, canvas.height, canvas.width)

            // Converting the image from the canvas to byte array and Blob
            const dataURL = canvas.toDataURL()
            const blobBin = atob(dataURL.split(',')[1])
            let array = []
            for (let i: number = 0; i < blobBin.length; i++) {
                array.push(blobBin.charCodeAt(i))
            }
            const file = new Blob([new Uint8Array(array)], {
                type: 'image/png',
            })

            // Saving new image
            const requestBody = new FormData()
            requestBody.append(onSaveField, file, 'file.png')
            onSave(requestBody, {
                headers: { 'Content-Type': 'multipart/form-data' },
            } as MutateOptions<
                Record<string, any>,
                Error,
                Record<string, any>,
                unknown
            >)
                .then(() => {
                    closeEditor()
                    setIsSaving(false)
                })
                .catch((e) => {
                    setIsSaving(false)
                    console.error('Error occurred while saving image', e)
                })
        }
    }

    return (
        <div className="flex max-md:flex-col gap-5 md:gap-10 md:items-center">
            {inputImage ? (
                <AvatarEditor
                    ref={editorRef}
                    image={inputImage}
                    width={180}
                    height={180}
                    scale={scale}
                    rotate={rotation}
                    className="rounded-xl"
                />
            ) : (
                initialImageComponent
            )}
            <div className="flex flex-col gap-3">
                {inputImage && (
                    <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-2 flex flex-col">
                        <label
                            className="text-sm text-gray-600 dark:text-gray-400"
                            htmlFor="scale-range"
                        >
                            {t('zoom')}
                        </label>
                        <input
                            id="scale-range"
                            type="range"
                            className="accent-accent pb-0 mb-0 dark:accent-accent-dark"
                            max={3}
                            min={1}
                            step={0.001}
                            value={scale}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setScale(Number(e.target.value))}
                        />
                        <label
                            className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-1"
                            htmlFor="rotation-controls"
                        >
                            {t('rotation')}
                        </label>
                        <div className="flex divide-x">
                            <Button
                                className="grow border-y border-accent dark:border-accent-dark !h-8 hover:bg-accent/5 dark:hover:bg-accent-dark/10 text-accent dark:text-accent-dark   border-l rounded-l-md"
                                action={() =>
                                    setRotation((prevState) => prevState + 90)
                                }
                            >
                                <BsArrowClockwise />
                            </Button>
                            <Button
                                className="grow border-y border-accent dark:border-accent-dark !h-8 hover:bg-accent/5 dark:hover:bg-accent-dark/10 text-accent dark:text-accent-dark  "
                                action={() => setRotation(0)}
                            >
                                {t('reset')}
                            </Button>
                            <Button
                                className="grow border-y border-accent dark:border-accent-dark !h-8 hover:bg-accent/5 dark:hover:bg-accent-dark/10 text-accent dark:text-accent-dark   !border-r rounded-r-md"
                                action={() =>
                                    setRotation((prevState) => prevState - 90)
                                }
                            >
                                <BsArrowCounterclockwise />
                            </Button>
                        </div>
                    </div>
                )}

                <div>
                    <input
                        ref={imageInputRef}
                        onChange={handleFileChange}
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp, image/jpg, image/heic"
                    />
                    {!inputImage && initialImageExists ? (
                        <>
                            <Button
                                className="text-accent dark:text-accent-dark"
                                action={openImageInput}
                                key={1}
                            >
                                <IoImageOutline />
                                {t('change_image')}
                            </Button>
                            <Button
                                className="text-red-600 dark:text-red-700 hover:!opacity-100 hover:text-red-700 dark:hover:text-red-800"
                                action={() => {
                                    let body: { [key: string]: any } = {}
                                    body[onSaveField] = null
                                    onSave && onSave(body)
                                }}
                                key={2}
                            >
                                <IoTrashOutline />
                                {t('remove_image')}
                            </Button>
                        </>
                    ) : inputImage ? (
                        <Button
                            className="text-accent dark:text-accent-dark"
                            action={closeEditor}
                            key={3}
                        >
                            <MdOutlineHideImage />
                            {t('clear_selection')}
                        </Button>
                    ) : (
                        <Button
                            className="text-accent dark:text-accent-dark"
                            action={openImageInput}
                            key={4}
                        >
                            <IoImageOutline />
                            {t('set_image')}
                        </Button>
                    )}
                </div>
                {!inputImage && (
                    <p className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                        JPG, PNG, WEBP, {t('or')} HEIC
                    </p>
                )}
                {inputImage && (
                    <Button
                        action={saveChanges}
                        style="primary"
                        disabled={isSaving}
                    >
                        <IoSaveOutline />
                        {isSaving ? t('saving') : t('save_changes')}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ImageEditor
