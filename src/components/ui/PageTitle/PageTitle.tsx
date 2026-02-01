type PageTitleProps = {
  background: string,
  children: React.JSX.Element
}

const PageTitle = ({ children, background }: PageTitleProps) => {
  return <div className={`relative top-5 sm:top-10 flex w-full bg-cover
    px-5 sm:px-10 sm:py-20 sm:rounded-t-2xl ${ background }
    bg-linear-to-r from-cyan-500 to-blue-500`}>
    { children }
  </div>
}

export default PageTitle;