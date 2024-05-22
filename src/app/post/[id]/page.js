export default function PostById({params}) {
    const id = params.id
    return (
       <>
        <h1> you are seeing a specific post with id {id}</h1>
       </>
    );
}