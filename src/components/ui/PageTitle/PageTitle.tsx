type PageTitleProps = {
  background: string,
  children: React.JSX.Element
}

const PageTitle = ({ children, background }: PageTitleProps) => {
  return <div className={`relative -z-1 top-5 sm:top-10 flex w-full bg-cover sm:p-20 sm:rounded-t-2xl ${ background }`}>
    { children }
  </div>
}

export default PageTitle;