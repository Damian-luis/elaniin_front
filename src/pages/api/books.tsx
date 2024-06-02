import apiClient from "@/utils/axios";


export async function queryBook(bookId: String, question: String): Promise<any> {
  try {
    const response = await apiClient.post(`/query/${bookId}`, {
     question
    });
    console.log("respuesta la chat");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}



export async function uploadBook(file:any,title:String) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title)
    const response = await apiClient.post('upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; 
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllBooks() {
  try {

    const response = await apiClient.post('/get');
    return response.data; 
  } catch (error) {
    console.error(error); 
    return null;
  }
}

export async function getBook(id:String) {
  try {

    const response = await apiClient.get(`getBook/${id}`);
    return response.data; 
  } catch (error) {
    console.error(error); 
    return null;
  }
}




export async function deleteBook(id:String) {
  try {
    const response = await apiClient.delete(`delete/${id}`);
    return response.status === 200; 
  } catch (error) {
    console.error(error); 
    return false; 
  }
}

