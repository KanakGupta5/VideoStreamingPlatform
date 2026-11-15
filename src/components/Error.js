const Error = ({error}) => {
    return <div className="text-center">{error?.message}</div>
}

export default Error;