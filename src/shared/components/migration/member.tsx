import React from 'react'
import Image from 'next/image'
import {IDependent} from '@fh-health/types/migrationTypes'

interface IMemberData {
  id: number
  firstName: string
  lastName: string
  isSelected?: boolean
  resultsCount?: number
}

interface IMember {
  member: IMemberData | IDependent
  isDependentMember: boolean
  children: JSX.Element | JSX.Element[]
}

const Member = ({member, children, isDependentMember}: IMember) => (
  <div className="member">
    <div className="member__info">
      <div className="member__credentials">
        <div>
          <div className="member__name">
            {member.firstName} {member.lastName}
          </div>
          {!isDependentMember && (
            <div className="member__results">{member.resultsCount} Results</div>
          )}
        </div>
        {!isDependentMember && member.isSelected && (
          <span>
            <Image src="/checked.svg" width={21} height={16} />
          </span>
        )}
      </div>
    </div>
    {children}
  </div>
)

export default Member
