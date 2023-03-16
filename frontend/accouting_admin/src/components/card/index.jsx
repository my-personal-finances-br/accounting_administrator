import './style.css'

export default function Card({children, month, setModalOpen}){
    return (
        <div className='Card'>
            <div className='HeaderCard'>
                {month}
            </div>
        {children}
        <div className='Buttonn'>
            <button onClick={() => setModalOpen(true)}>Add</button>
        </div>
        </div>
    )
}