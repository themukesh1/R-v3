async function LoginById(id){
    try {
        const response = await fetch(`${process.env.BACKEND_API}/api/user/loginById`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id})
        });
  
        if (!response.ok) {
          throw new Error('Failed to login');
        }
  
        const user = await response.json();
        return user
      } catch (error) {
        console.error(error);
        // Handle error
      }
}

export default LoginById