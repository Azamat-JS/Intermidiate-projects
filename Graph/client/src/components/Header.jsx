import logo from '../images/graphql.png'

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container">
            <a className='navbar-brand' href="/">
            <div className="d-flex">
                <img src={logo} alt="logo" className='mr-2' />
                <div>Project Service</div>
            </div>
            </a>
        </div>
    </nav>
  )
}
