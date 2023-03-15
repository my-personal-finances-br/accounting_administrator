import './style.css'

export default function Card({children, month}){
    return (
        <div className='Card'>
            <div className='HeaderCard'>
                {month}
            </div>
        {children}
        </div>
    )
}