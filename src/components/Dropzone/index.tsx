import React, {useCallback, useState} from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'


import './style.css'

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selecteFileUrl, setSelectedFileUrl] = useState('')
  const onDrop = useCallback(acceptFiles => {
    const file = acceptFiles[0]

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)
    onFileUploaded(file)
  }, [onFileUploaded])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      { selecteFileUrl ?
          <img src={selecteFileUrl} alt="Point thumbnail" />
        : (
          <p>
            <FiUpload />
            Imagem do estabelecimento
          </p>
        )
      }

    </div>
  )
}

export default Dropzone
