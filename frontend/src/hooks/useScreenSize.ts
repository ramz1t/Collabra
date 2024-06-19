import { useMediaQuery } from 'react-responsive'

const useScreenSize = () => {
    const minTabletW: number = 768
    const minPCW: number = 1024
    const minLargePCW: number = 1280

    const isTablet: boolean = useMediaQuery({
        query: `(min-width: ${minTabletW}px)`,
    })
    const isPC: boolean = useMediaQuery({ query: `(min-width: ${minPCW}px)` })
    const isLargePC: boolean = useMediaQuery({
        query: `(min-width: ${minLargePCW}px)`,
    })

    return {
        isTablet,
        isPC,
        isLargePC,
    }
}

export default useScreenSize
