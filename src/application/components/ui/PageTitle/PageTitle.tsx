type PageTitleProps = {
  background: string,
  children: React.JSX.Element
}

const PageTitle = ({ children, background }: PageTitleProps) => {
  return <div className={`relative top-5 sm:top-10 flex w-full bg-cover justify-end
    px-5 sm:px-10 py-20 sm:rounded-t-2xl ${ background }
    mask-b-to-100% from-0% via-60% mask-b-from-65%`}>
    { children }
  </div>
}

export default PageTitle;