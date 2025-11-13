export function tagStatus(status = '') {
  const tag = document.createElement('div');
  tag.className = 'tag-status';

  const tagBullet = document.createElement('div');
  tagBullet.className = 'tag-status-bullet';

  const tagText = document.createElement('span');
  tagText.className = 'tag-status-text';
  tagText.textContent = status;

  tag.appendChild(tagBullet);
  tag.appendChild(tagText);

  return tag;
}