import React, {useEffect, useRef, useState} from 'react'
import PureBlock from '@fh-health/component/results/pureBlock'
import Image from 'next/image'
import Member from '@fh-health/component/migration/member'
import Modal from '@fh-health/component/utils/modal'
import migrationManager from '@fh-health/manager/migrationManager'
import CircleLoader from '@fh-health/component/utils/circleLoader'
import * as Sentry from '@sentry/nextjs'
import MigrationInitialModal from '@fh-health/component/migration/initialModal'
import SuccessModal from '@fh-health/component/migration/successModal'
import AllSetModal from '@fh-health/component/migration/allSetModal'
import {
  IDependent,
  MemberConfirmActionType,
  MemberSelectType,
} from '@fh-health/types/migrationTypes'
import {useRouter} from 'next/router'
import {useClickAway} from 'react-use'
import {useSelector} from 'react-redux'
import {IStore} from '@fh-health/redux/store'

const MigrationFlowView = () => {
  const [confirmButtonState, setConfirmButtonState] = useState<boolean>(false)
  const [initialModalView, setInitialModalView] = useState<boolean>(true)
  const [organizedDataModal, setOrganizedDataModal] = useState<boolean>(false)
  const [dependentUserView, setDependentUserView] = useState<boolean>(false)
  const [successModalView, setSuccessModalView] = useState<boolean>(false)
  const [finalModalView, setFinalModalView] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [members, setMembers] = useState([])
  const [patientsForMigration, setPatientsForMigration] = useState([])
  const [dependentList, setDependentsList] = useState<IDependent[]>([])
  const [error, setError] = useState<string>('')
  const [isEditableMember, setIsEditableMember] = useState<boolean>(false)
  const [selectedMember, setSelectedMember] = useState({
    id: null,
    firstName: '',
    lastName: '',
    isSelected: false,
    resultsCount: null,
    idPatient: null,
  })

  const organizeModalRef = useRef(null)
  const router = useRouter()
  const patientInformation = useSelector((state: IStore) => state.patientInformation.value)

  useClickAway(organizeModalRef, () => {
    setDependentUserView(false)
    setOrganizedDataModal(false)
    setSuccessModalView(false)
    setIsEditableMember(false)
  })

  const selectMember = (id) => {
    setOrganizedDataModal(true)
    const selectedUser = members.find((member) => member.id === id)
    setSelectedMember(selectedUser)
  }

  const addOrConfirmMember = (type: MemberSelectType, patientId?: string) => {
    if (type === MemberSelectType.New) {
      if (isEditableMember) {
        const updatedPatientsForMigration = patientsForMigration.map((patient) => {
          if (patient.notConfirmedPatientId === selectedMember.idPatient) {
            return {
              notConfirmedPatientId: selectedMember?.idPatient,
              action: MemberConfirmActionType.New,
            }
          }

          return patient
        })

        setPatientsForMigration(updatedPatientsForMigration)
      } else {
        setPatientsForMigration([
          ...patientsForMigration,
          {
            notConfirmedPatientId: selectedMember?.idPatient,
            action: MemberConfirmActionType.New,
          },
        ])
      }
    } else if (type === MemberSelectType.Dependent) {
      if (isEditableMember) {
        const updatedPatientsForMigration = patientsForMigration.map((patient) => {
          if (patient.notConfirmedPatientId === selectedMember.idPatient) {
            return {
              notConfirmedPatientId: selectedMember?.idPatient,
              action: MemberConfirmActionType.Merge,
              patientId,
            }
          }

          return patient
        })

        setPatientsForMigration(updatedPatientsForMigration)
      } else {
        setPatientsForMigration([
          ...patientsForMigration,
          {
            notConfirmedPatientId: selectedMember?.idPatient,
            action: MemberConfirmActionType.Merge,
            patientId,
          },
        ])
      }
    } else if (isEditableMember) {
      const updatedPatientsForMigration = patientsForMigration.map((patient) => {
        if (patient.notConfirmedPatientId === selectedMember.idPatient) {
          return {
            notConfirmedPatientId: selectedMember?.idPatient,
            action: MemberConfirmActionType.Merge,
            patientId: patientInformation.organizations?.[0]?.patientId,
          }
        }

        return patient
      })

      setPatientsForMigration(updatedPatientsForMigration)
    } else {
      setPatientsForMigration([
        ...patientsForMigration,
        {
          notConfirmedPatientId: selectedMember?.idPatient,
          action: MemberConfirmActionType.Merge,
          patientId: patientInformation.organizations?.[0]?.patientId,
        },
      ])
    }
  }

  const toggleCurrentMemberFlow = (type = MemberSelectType.You) => {
    if (type === MemberSelectType.You) {
      addOrConfirmMember(type)
      updateMembersList(type)
      setOrganizedDataModal(false)
    } else if (type === MemberSelectType.Dependent) {
      setDependentUserView(true)
    } else if (type === MemberSelectType.New) {
      addOrConfirmMember(type)
      updateMembersList(type)
      setSuccessModalView(true)
      resetOrganizedViewsState()
    }
  }

  const updateMembersList = (type: MemberSelectType) => {
    const newMembers = members.map((item) => {
      if (item.id === selectedMember.id) {
        if (type === MemberSelectType.You) {
          return {
            ...item,
            isSelected: true,
            you: true,
          }
        }

        if (item.you) {
          return {
            ...item,
            isSelected: true,
            you: false,
          }
        }

        return {
          ...item,
          isSelected: true,
        }
      }

      return item
    })

    setMembers(newMembers)
  }

  const editMember = (id) => {
    setIsEditableMember(true)
    selectMember(id)
  }

  const resetOrganizedViewsState = () => {
    setDependentUserView(false)
    setOrganizedDataModal(false)
  }

  const getUnconfirmedPatients = async () => {
    setIsFetching(true)
    try {
      const {data} = await migrationManager.getPatientsList()
      const membersList = data.data.map((member, index) => ({
        ...member,
        id: index,
        isSelected: false,
      }))
      setMembers(membersList)
    } catch (err) {
      setError(err.response.data.status.message)
      Sentry.captureException(err)
    }
    setIsFetching(false)
  }

  const getDependentsList = async () => {
    setIsFetching(true)
    try {
      const {data} = await migrationManager.getDependentsList()
      setDependentsList(data.data)
    } catch (err) {
      setError(err.response.data.status.message)
      Sentry.captureException(err)
    }
    setIsFetching(false)
  }

  const confirmPatientsResults = async () => {
    setLoading(true)
    try {
      const {status} = await migrationManager.migrateSelectedPatients(patientsForMigration)
      if (status === 201) {
        setFinalModalView(true)
      }
    } catch (err) {
      setError(err.response.data.status.message)
      Sentry.captureException(err)
    }
    setLoading(false)
  }

  const allSetModalClose = () => {
    setFinalModalView(false)
    router.push('/results/list')
  }

  const displayOrganizedDataModal = () => (
    <div className="migration-modal">
      <Modal>
        <div className="card" ref={organizeModalRef}>
          <div className="card__body card__body_permissions">
            {!dependentUserView ? (
              <>
                <div className="card__header">
                  <h4 className="card__header-title">Organize Data</h4>
                  <p className="card__header-message">
                    Who does the result for {selectedMember.firstName} {selectedMember.lastName}{' '}
                    belong to?
                  </p>
                </div>
                <button
                  type="button"
                  className="button card__button migration-modal__button"
                  onClick={() => toggleCurrentMemberFlow()}
                >
                  You
                </button>
                <button
                  type="button"
                  className="button card__button migration-modal__button"
                  onClick={() => toggleCurrentMemberFlow(MemberSelectType.Dependent)}
                >
                  Dependent, Family or Friend
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setDependentUserView(false)}
                  className="button card__close card__close_left card__back-arrow"
                >
                  <Image src="/backwardArrow.svg" width={24} height={24} alt="close" />
                </button>
                <div className="card__header">
                  <h4 className="card__header-title">Organize Data</h4>
                  <p className="card__header-message">
                    Does {selectedMember.firstName} happen to map one of your existing profiles?
                  </p>
                </div>
                <div className="migration__members scrollable">
                  {dependentList.map((dependent: IDependent, index: number) => (
                    <Member key={index} member={dependent} isDependentMember>
                      <button
                        type="button"
                        className="button member__button"
                        onClick={() => {
                          addOrConfirmMember(MemberSelectType.Dependent, dependent.id)
                          updateMembersList(MemberSelectType.Dependent)
                          resetOrganizedViewsState()
                        }}
                      >
                        Select
                      </button>
                    </Member>
                  ))}
                </div>

                <button
                  type="button"
                  className="button card__button migration-modal__button"
                  onClick={() => toggleCurrentMemberFlow(MemberSelectType.New)}
                >
                  Add as New
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )

  useEffect(() => {
    ;(async () => {
      await getUnconfirmedPatients()
      await getDependentsList()
    })()
  }, [])

  useEffect(() => {
    if (members.length && members.every((member) => member.isSelected)) {
      setConfirmButtonState(true)
    } else {
      setConfirmButtonState(false)
    }
  }, [members])

  return (
    <>
      <div className="pure-block-wrapper migration">
        <PureBlock flow center={false} isNoResults={false}>
          <div className="logo">
            <Image src="/logo.svg" width={136} height={16} alt="logo" />
          </div>
          <h4 className="header">Migration Wizard</h4>
          <p className="message">
            Select which one of these belong to you (include variations or misspellings of your
            name) or dependents, family, or friends.
          </p>
          <div className="migration__members scrollable">
            {isFetching ? (
              <CircleLoader className="middle-loader" />
            ) : (
              members.map((member, index) => (
                <Member key={index} member={member} isDependentMember={false}>
                  <button
                    type="button"
                    className={
                      !member.isSelected
                        ? 'button member__button'
                        : 'button member__button member__button_edit'
                    }
                    onClick={() =>
                      !member.isSelected ? selectMember(member.id) : editMember(member.id)
                    }
                  >
                    {!member.isSelected ? 'Select' : 'Edit'}
                  </button>
                </Member>
              ))
            )}
          </div>
          <div className="inputGroup">
            {error && <p className="error-message">{error}</p>}
            {loading ? (
              <CircleLoader className="middle-loader" />
            ) : (
              <button
                type="button"
                className={
                  confirmButtonState
                    ? 'button inputGroup__button migration__button migration__button_active'
                    : 'button inputGroup__button migration__button inputGroup__button_disabled'
                }
                onClick={confirmPatientsResults}
              >
                Confirm
              </button>
            )}
          </div>
        </PureBlock>
      </div>
      {initialModalView && <MigrationInitialModal closeModal={() => setInitialModalView(false)} />}
      {organizedDataModal && displayOrganizedDataModal()}
      {successModalView && (
        <SuccessModal
          closeModal={() => setSuccessModalView(false)}
          firstName={selectedMember.firstName}
        />
      )}
      {finalModalView && <AllSetModal closeModal={() => allSetModalClose()} />}
    </>
  )
}

export default MigrationFlowView
