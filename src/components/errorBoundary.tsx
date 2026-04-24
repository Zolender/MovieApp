
import { Component, ErrorInfo, ReactNode } from "react"

type Props = {
    children: ReactNode
}

type State ={
    hasError: boolean
    message: string
}


class ErrorBoundary extends Component<Props, State>{
    constructor(props: Props){
        super(props)
        this.state = {
            hasError: false,
            message: ""
        }
    }

    componentDidCatch(error: Error): void {
        this.setState({
            hasError: true,
            message: error.message
        })
    }

    render() {
        if(this.state.hasError){
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold text-red-500">Something went wrong</h1>
                    <p className="">{this.state.message}</p>
                    <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md">Try Again</button>
                </div>
            );
        }
        //else
        return this.props.children
    }
}

export default ErrorBoundary