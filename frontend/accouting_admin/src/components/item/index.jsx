import './style.css'

export default function Item({value, name}){
    return (
        <div className="Item">
            <span>{name}</span>
            <span>R$ {value}</span>
        </div> 
    )
}