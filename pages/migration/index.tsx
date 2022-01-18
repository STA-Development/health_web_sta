import React, {useEffect, useState} from "react"
import PureBlock from "@fh-health/component/pureBlock"
import Image from "next/image"
import Member from "@fh-health/component/base/migration/member"

const MigrationFlowView = () => {
  const [confirmButtonState, setConfirmButtonState] = useState<boolean>(false)
  const [members, setMembers] = useState([
    {
      id: 1,
      results: 16,
      name: "John Doe",
      isSelected: false,
    },
    {
      id: 2,
      results: 8,
      name: "Claire Doe",
      isSelected: false,
    },
    {
      id: 3,
      results: 23,
      name: "Francis Doe",
      isSelected: false,
    },
    {
      id: 4,
      results: 3,
      name: "Adam Doe",
      isSelected: false,
    }
  ]);

  useEffect(() => {
    if (members.every(member => member.isSelected)) {
      setConfirmButtonState(true)
    } else {
      setConfirmButtonState(false)
    }
  }, [members])

  return (
    <div className="pure-block-wrapper migration">
      <PureBlock flow center={false} isNoResults={false}>
        <div className="logo">
          <Image src="/logo.svg" width={136} height={16} alt="logo" />
        </div>
        <h4 className="header">Migration Wizard</h4>
        <p className="message">
          Select which one of these belong to you
          (include variations or misspellings of your name) or dependents, family, or friends.
        </p>
        <div className="migration__members">
          {
            members.map((member, index) => (
              <Member
                key={index}
                member={member}
                members={members}
                setMembers={setMembers}
              />
            ))
          }
        </div>
        <div className="inputGroup">
          <button
            type="button"
            className={
              confirmButtonState
                ? 'button inputGroup__button migration__button migration__button_active'
                : 'button inputGroup__button migration__button inputGroup__button_disabled'
            }
          >
            Confirm
          </button>
        </div>
      </PureBlock>
    </div>
  )
}

export default MigrationFlowView;