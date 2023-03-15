import './style.css'

export default function Card({children, month}){
    return (
        <div className='Card'>
            <div className='HeaderCard'>
                {month}
            </div>
        {children}
        <div className='Buttonn'>
            <button>Add</button>
        </div>
        </div>
    )
}