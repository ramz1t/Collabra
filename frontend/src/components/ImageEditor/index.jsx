import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../index.js'
import AvatarEditor from 'react-avatar-editor'
import { IoImageOutline, IoTrashOutline, IoSaveOutline } from 'react-icons/io5'
import { MdOutlineHideImage } from 'react-icons/md'
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs'

const ImageEditor = ({
    initialImageComponent,
    initialImageExists,
    aspectRatio = 1,
    onSave,
    onSaveField = 'image',
}) => {
    const { t } = useTranslation()
    const [inputImage, setInputImage] = useState(null)
    const imageInputRef = useRef()
    const editorRef = useRef()
    const [scale, setScale] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [isSaving, setIsSaving] = useState(false)

    const openImageInput = useCallback(
        () => imageInputRef.current && imageInputRef.current.click(),
        [imageInputRef]
    )

    const closeEditor = () => {
        setInputImage(null)
        setScale(1)
        setRotation(0)
    }

    const saveChanges = () => {
        try {
            setIsSaving(true)
            const img = new Image()
            let body = {}
            img.src = editorRef.current.getImage().toDataURL()
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas')
                    canvas.width = 600
                    canvas.height = 600
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 0, 0, 600, 600)
                    body[onSaveField] = canvas.toDataURL('image/png')
                    onSave &&
                        onSave(body).then(() => {
                            closeEditor()
                            setIsSaving(false)
                        })
                } catch (e) {
                    setIsSaving(false)
                    console.error('Error occurred while saving image', e)
                }
            }
        } catch (e) {
            setIsSaving(false)
            console.error('Error occurred while saving image', e)
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
                    aspect={aspectRatio}
                    scale={scale}
                    rotate={rotation}
                    className="rounded-xl"
                />
            ) : (
                initialImageComponent
            )}
            <div className="flex flex-col gap-3">
                {inputImage && (
                    <div className="bg-gray-100 rounded-lg p-2 flex flex-col">
                        <label
                            className="text-sm text-gray-600"
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
                            onChange={(e) => setScale(e.target.value)}
                        />
                        <label
                            className="text-sm text-gray-600 mt-2 mb-1"
                            htmlFor="rotation-controls"
                        >
                            {t('rotation')}
                        </label>
                        <div className="flex divide-x">
                            <Button
                                className="grow border-y border-accent dark:border-accent-dark !h-8 hover:bg-accent/5 dark:bg-accent-dark/10 text-accent dark:text-accent-dark   border-l rounded-l-md"
                                action={() =>
                                    setRotation((prevState) => prevState + 90)
                                }
                            >
                                <BsArrowClockwise />
                            </Button>
                            <Button
                                className="grow border-y border-accent dark:border-accent-dark !h-8 hover:bg-accent/5 dark:bg-accent-dark/10 text-accent dark:text-accent-dark  "
                                action={() => setRotation(0)}
                            >
                                {t('reset')}
                            </Button>
                            <Button
                                className="grow border-y border-accent dark:border-accent-dark !h-8 hover:bg-accent/5 dark:bg-accent-dark/10 text-accent dark:text-accent-dark   !border-r rounded-r-md"
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
                        onChange={(e) => setInputImage(e.target.files[0])}
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
                                className="text-red-700"
                                action={() => {
                                    let body = {}
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
