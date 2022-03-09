import React from 'react'
import Image from 'next/image'
import Card from '@fh-health/components/utils/card'

const NoResults = () => (
  <div className="web-portal-results" data-cy="no-tests">
    <Card permissions={false}>
      <div className="card__media card__media_sm">
        <Image src="/search.svg" width={86} height={96} alt="No Results" />
      </div>
      <div className="card__content">
        <h4 className="card__content-title">Results Will Appear Here</h4>
        <p className="card__content-message">
          Once you have used our service, results of the tests will appear here and you can download
          the report for each.
        </p>
      </div>
    </Card>
  </div>
)

export default NoResults
