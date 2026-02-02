import * as React from "react"

const NO_CLASSNAME = ''

function useShowHide(className: string, height: number): Array<string> {
  const previousY = React.useRef<number>(0)
  const [translate, setTranslate] = React.useState('')
  const handleScroll = React.useCallback(() => {
      if (window.scrollY > height && previousY.current < window.scrollY) {
        setTranslate(className)
      } else if (height && (previousY.current > window.scrollY || window.scrollY <= 0)) {
        setTranslate(NO_CLASSNAME)
      }
      previousY.current = window.scrollY
  }, [className, height])

  React.useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
    }, [handleScroll])

  return [translate]
}

export default useShowHide