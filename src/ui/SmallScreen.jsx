export default function SmallScreen({ children }){
    return (
        <div className="block md:hidden">
            {children}
        </div>
    )
}