'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useGetTagsListQuery } from '@boilerplate/front-end/store/queries/reference.query'

import classes from '@boilerplate/front-end/components/tackle/left/fishing-gear/style.module.scss'

// eslint-disable-next-line prettier/prettier
interface FishingGearProps { }

export const FishingGear: React.FC<FishingGearProps> = () => {
  const [activeGroups, setActiveGroups] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const { data: tagsListData = {} } = useGetTagsListQuery()
  const tagsGroups = tagsListData.result || []

  const toggleGroup = (groupId: string): void => {
    setActiveGroups((prevGroups) => ({
      ...prevGroups,
      [groupId]: !prevGroups[groupId],
    }))
  }

  const handleTackleCategoryChange = (categoryId: string): void => {
    router.push(`/tackle/${categoryId}`)
  }

  return (
    <div className={classes.container}>
      <button className={classes['reset-button']} onClick={() => router.push('/')}>
        Скинути пошук
      </button>
      {tagsGroups.map(({ id: tagGroupId, title: tagGroupTitle, tags }) => (
        <div key={tagGroupId} className={classes['gear-category']}>
          <h3 onClick={() => toggleGroup(tagGroupId)}>{tagGroupTitle}</h3>
          {activeGroups[tagGroupId] && (
            <ul>
              {tags.map(({ id: tagId, title: tagTitle }) => (
                <li key={tagId} onClick={() => handleTackleCategoryChange(tagId)} className={classes['tag-item']}>
                  {tagTitle}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
