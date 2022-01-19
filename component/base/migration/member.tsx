import React from "react"
import Image from "next/image"

interface IMemberData {
  id: number
  name: string
  results: number
  isSelected: boolean
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
          <div className="member__name">{member.name}</div>
          <div className="member__results">{member.results} Results</div>
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
