const RichDescription = ({text, className}: {text: string, className?: string}) => {
    return <p dangerouslySetInnerHTML={{__html: text}} className={className}></p>
}

export default RichDescription