interface ButtonProps {
    title?: string
    type?: "button" | "submit" | "reset" | undefined
    titleCss?: string
    icon?: React.ElementType
    iconCss?: string
    href?: string
    target?: string
    buttonCss?: string
    handleClick?: () => void
}

export default function Button ({ title, type, titleCss, icon: Icon, iconCss, href, target, buttonCss, handleClick }: ButtonProps) {

    return (
        href 
            ? 
                <a 
                    href={href} 
                    target={target} 
                    rel="noopener noreferrer" 
                    className={buttonCss ? buttonCss : ""}
                >
                    {Icon && 
                        <Icon 
                            className={iconCss} 
                        />
                    }

                    <span 
                        className={titleCss ? titleCss : ""}
                    >
                        { title }
                    </span>
                </a>
            :
                <>
                    <button 
                        type={type} 
                        className={buttonCss ? buttonCss: ""} 
                        onClick={handleClick}
                    >
                        {Icon && 
                            <Icon 
                                className={iconCss} 
                            />
                        }

                        <span 
                            className={titleCss ? titleCss : ""}
                        >
                            { title }
                        </span>
                    </button>
                </>
    )
}