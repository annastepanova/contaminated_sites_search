import React from 'react'
import { Link } from 'react-router-dom'

const Result = (props) => {
	const filteredResults = props.sites.filter(site => {
	if (props.permit === 'all') return true
		else return site.attributes.PERMITTYPE === props.permit
	})
	return (
		<>
			<div className="results-filters">
				<div id="totalResultsDiv">
					<h1 className="totalResults">Showing {filteredResults.length} of {props.sites.length} results for {props.permitText}</h1>
				</div>
				<div id="filtersDiv">
					<label htmlFor="radius-dropbox">Radius:</label>
					<select
						id="radius-dropbox"
						value={props.radiusMiles}
						onChange={props.handleRadiusChange}
					>
						<option value="1">1 Mile</option>
						<option value="2">2 Miles</option>
						<option value="3">3 Miles</option>
					</select>
					<label htmlFor="permit">Type of contamination:</label>
					<select
						id="permit"
						value={props.permit}
						onChange={props.handlePermitChange}
					>
						<option value="all">All</option>
						<option value="UT">Storage Tanks</option>
						<option value="IW5">Industrial Waste</option>
						<option value="HWR">Hazardous Waste Removal</option>
						<option value="SW">Solid Waste</option>
						<option value="IW">Industrial Waste</option>
						<option value="AW">Waste</option>
						<option value="ARP">Airports and Contracts</option>
					</select>
				</div>
			</div>
			<div className="outer-wrapper">
				{
					filteredResults.map((site, index )=> (
						<Link key={site.attributes.OBJECTID} to={`/places/${props.placeId}/sites/${site.attributes.OBJECTID}`}>
							<div className="inner-wrapper" key={index}>
								<div className="image-wrapper" key={index}>
                  <img className="google-image" src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${site.attributes.HNUM}+${site.attributes.ST_NAME}+${site.attributes.PRE_DIR}+${site.attributes.ST_TYPE}+MIAMI+FL&heading=271&pitch=-0.76&key=${process.env.REACT_APP_GOOGLE_API_KEY}`} alt="contaminated site" />
								</div>
								<div className="text-wrapper">
									<h3>Status: {site.attributes.CLASSIFCTN}</h3>
									<h3>Type: {site.attributes.PERMITTYPE}</h3>
									<h3>Cleanup: {site.attributes.TASK_NAME}</h3>
									<h3>Address: {site.attributes.HNUM} {site.attributes.PRE_DIR} {site.attributes.ST_NAME} {site.attributes.ST_TYPE}</h3>
								</div>						
							</div>
						</Link>
					))
				}
			</div>
		</>
	)
} 

export default Result
