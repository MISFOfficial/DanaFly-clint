// import logo2 from '../../assets/DanaFly_2.png'
import logo2 from '../../assets/DanaFly_!.png'

const Logo = () => {
    return (
        <div className='flex items-center  '>
            <img className='w-10 md:w-15 lg:w-20' src={logo2} alt="" />
            <h1 className="font-bold  text-xl md:text-3xl banner-text  hidden sm:hidden mt-7 md:block">DanaFly</h1>
        </div>
    );
};

export default Logo;