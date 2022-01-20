import React from "react"
import Image from "next/image"

interface IMemberData {
  id: number
  firstName: string
  isSelected: boolean
  resultsCount: number
}

interface IMember {
  member: IMemberData
  children: JSX.Element | JSX.Element[]
}

const Member = ({ member, children } : IMember) => (
  <div className="member">
    <div className="member__info">
      <div className="member__credentials">
        <div>
          <div className="member__name">{member.firstName}</div>
          <div className="member__results">{member.resultsCount} Results</div>
        </div>
        { member.isSelected && (
          <span>
            <Image src="/checked.svg" width={21} height={16} />
          </span>
        ) }
      </div>
    </div>
    {children}
  </div>
)

export default Member
