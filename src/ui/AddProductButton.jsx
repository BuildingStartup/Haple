export default function AddProductButton({products, showForm, remaining, handleAddItem}){
    return (
        <>
        {products.length < 4 && !showForm && (
        <div className="flex flex-col gap-2 px-5">
          <p className="text-stone-500">
            You can add{" "}
            <span className="text-primary">
              {remaining}</span> more
            item{remaining !== 1 ? "s" : ""}
          </p>
          <button
            className="bg-primary text-stone-50 px-2 py-4 text-base rounded cursor-pointer"
            onClick={handleAddItem}            
          >
            Add Item ({products.length}/4)
          </button>
        </div>
      )}
        </>
    )
}