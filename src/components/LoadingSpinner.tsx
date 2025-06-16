const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-10 h-10 border-4 border-muted-foreground border-t-primary rounded-full animate-spin"></div>
    </div>
  )
}

export default LoadingSpinner
