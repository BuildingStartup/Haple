export default function BigScreen() {
    return (
        <div className="hidden md:flex min-h-screen items-center justify-center bg-slate-50">
            <div className="text-center space-y-3 px-6">
              <p className="text-4xl">📱</p>
              <h2 className="text-2xl font-bold text-primary">
                Mobile Only Experience
              </h2>
              <p className="text-slate-700 text-base">
                <span className="text-primary text-lg">Haple</span> is designed
                for mobile. Please open it on your phone for the best
                experience.
              </p>
            </div>
        </div>
    )
}