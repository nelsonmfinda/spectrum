import React from 'react';
import generateMetaInfo from 'shared/generate-meta-info';
import Head from '../../../components/head';
import {
  StyledHeader,
  PhotosContainer,
  Photo,
  Names,
  Username,
  PhotoWrapper,
} from './style';

const Header = ({ thread, currentUser }) => {
  const trimmedUsers = thread.participants.filter(
    user => user.userId !== currentUser.id
  );

  const photos = trimmedUsers.map(user => (
    <PhotoWrapper key={user.id}>
      <Photo user={user} size={56} showOnlineStatus={false} />
    </PhotoWrapper>
  ));

  const names = trimmedUsers.map(user => user.name).join(', ');
  const username =
    trimmedUsers.length === 1 && trimmedUsers[0].username
      ? trimmedUsers[0].username
      : '';

  const { title, description } = generateMetaInfo({
    type: 'directMessage',
    data: {
      title: `${names}`,
      description: `Conversation with ${names}`,
    },
  });

  return (
    <StyledHeader data-cy="dm-header">
      <Head title={title} description={description} />
      <PhotosContainer>{photos}</PhotosContainer>
      <Names>{names}</Names>
      <Username>{username && `@${username}`}</Username>
    </StyledHeader>
  );
};

export default Header;
