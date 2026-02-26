function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div 
        className="w-[6.4rem] aspect-square rounded-full animate-spin"
        style={{
          background: 'radial-gradient(farthest-side, var(--color-primary) 94%, transparent) top/10px 10px no-repeat, conic-gradient(transparent 30%, var(--color-primary))',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)',
          animationDuration: '1.5s'
        }}
      />
    </div>
  );
}

export default Spinner
