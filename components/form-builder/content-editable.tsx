interface Props {
    styleClasses: string;
    innerContent?: string;
    inputHandler: (e: any) => void;
}

export const ContentEditable: React.FC<Props> = ({
    styleClasses,
    innerContent,
    inputHandler,
}) => {
    return (
        <>
            <div
                contentEditable="true"
                suppressContentEditableWarning={true}
                tabIndex={0}
                placeholder={"Start typing..."}
                className={styleClasses}
                onInput={(e) => inputHandler(e)}
            >
                {innerContent}
            </div>

            <style jsx>{`
                .question_title:empty::before {
                    content: attr(placeholder);
                    display: block;
                    cursor: text;
                    color: rgba(107, 114, 128, var(--tw-text-opacity));
                }
            `}</style>
        </>
    );
};
