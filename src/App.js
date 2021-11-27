import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import React, { useState } from 'react'
import { storage } from './helpers/fire'

const App = () => {
  const [coverUrl, setCoverUrl] = useState(null)

  async function uploadFile(e) {
    const file = e.target.files[0]
    const storageRef = ref(storage, `album-cover/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    setCoverUrl(await getDownloadURL(uploadTask.snapshot.ref))
  }

  return (
    <div>
      <input type="file" onChange={uploadFile} />
      {coverUrl && <img src={coverUrl} alt="cover" />}
    </div>
  )
}

export default App
