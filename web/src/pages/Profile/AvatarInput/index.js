import React, { useState, useRef, useEffect } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useField } from '@rocketseat/unform';

import ActivityIndicator from '~/components/ActivityIndicator';
import api from '~/services/api';
import { formatInitials } from '~/util/format';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');
  const { name } = useSelector(state => state.user.profile);

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]); // eslint-disable-line

  async function handleChange(e) {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append('file', e.target.files[0]);

      const response = await api.post('/avatars', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error(
          'Ocorreu um erro ao tentar se comunicar com o servidor, favor tentar novamente mais tarde'
        );
      }
    }

    setIsLoading(false);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="Avatar" />
        ) : (
          <div className="name">{formatInitials(name)}</div>
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
      <div className="camera-icon">
        {isLoading ? (
          <ActivityIndicator size={24} />
        ) : (
          <MdCameraAlt size={24} color="#fff" />
        )}
      </div>
    </Container>
  );
}
