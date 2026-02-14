// tell layout component to receive children components
// and tell it where to display it on the screen


//props tells component to be ready to receive
//receive children
//React automatically gathers everything you put between the opening and closing tags of your component and puts it into that children variable
//any content placed between the opening tag <Layout> and the closing tag </Layout> is automatically bundled into an object

const header = (
    <header>
        <h1 className="text-gradient">Daily Gains</h1>
        <p><strong>The 30 Simple Workouts Program</strong></p>
    </header>
)

const footer = (
    <footer>
        <p>
            Built by <a href="https://www.USERNAME.netlify.app" target="_blank">Maia</a>
            <br/>
            Styled with <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a>
        </p>
    </footer>
)


export default function Layout(props) {
    
    const { children } = props
    
    return (
        <>
            {header}
            {children}
            {footer}
        </>
    )
}