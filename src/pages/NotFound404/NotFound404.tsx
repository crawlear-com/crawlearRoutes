
import imageNotFound from '../../assets/images/404.png'

const NotFound404 = () => {
  return <div className='flex flex-col w-full h-full justify-center items-center mt-20 sm:mt-50'>
    <img src={imageNotFound} />
    404 Error, the page was not found
  </div>
}

export default NotFound404;