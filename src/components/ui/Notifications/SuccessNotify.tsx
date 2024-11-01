export interface ISuccessNotifyProps {
    title: string;
    text: string;
    onClose: () => void
}

const SuccessNotify = ({ title, text, onClose }: ISuccessNotifyProps) => {

    return (
        <div className="relative overflow-hidden rounded-lg w-[420px] grid grid-cols-1 items-center gap-1 py-4 bg-white text-black">
            <span className="bg-[#DDF7E0] w-12 h-full absolute top-0 left-0 grid place-items-center" >
                <img src="success-notify.svg" alt="" role="presentation" />
            </span>

            <h4 className="font-bold text-xl px-16">{title}</h4>
            <p className="px-16">{text}</p>

            <button className="absolute  top-4 right-4 bg-transparent p-0" onClick={onClose}>
                <img className="size-6" src="cross.svg" alt="Убрать уведомление" />
            </button>
        </div>
    )
}

export { SuccessNotify }