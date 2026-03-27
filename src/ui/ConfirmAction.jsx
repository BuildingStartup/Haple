export default function ConfirmAction({action, icon, onClick, loading,  onCloseModal}){

    function handleClick(){
        onClick?.();
        onCloseModal?.();
    }

    function handleCancel(){
        onCloseModal?.();
    }

    return (
        <div className="bg-white flex flex-col gap-3 py-10 px-6 rounded-md">
            <p className="text-center font-medium text-xl lg:text-2xl">Are you sure you want to {action}?</p>
            <div className="flex gap-4">
                <button className="flex-4 ring-2 ring-stone-300 p-3 font-medium rounded cursor-pointer transition-all duration-100 hover:bg-stone-50 lg:text-lg" onClick={handleCancel}>Cancel</button>
                <button 
                className="flex-4 flex gap-2 items-center justify-center capitalize p-3 bg-red-600 text-white rounded  cursor-pointer hover:bg-red-700 transition-all duration-100 lg:text-lg disabled:cursor-not-allowed"
                onClick={handleClick}
                disabled={loading}>
                    <span>{loading ? "confirming..." : action}</span>
                    {icon}
                </button>
            </div>
        </div>
    );
}