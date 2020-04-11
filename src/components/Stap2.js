import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import PopupButton from "./popups/PopupButton";
import SetSelectedAuthorityManual from "./SetSelectedAuthorityManual";

function Stap2({ value, clickHandlerAuthority, clickHandlerClearSelectedAuthority, authorities, changeHandlerUser }) {
	const [searchValue, setSearchValue] = useState("");
	const [manualAuthority, setManualAuthority] = useState(false);
	const [errors, setErrors] = useState([]);
	return (
		<div className="formLetter">
			<img className="logoWob" src={logo} />
			<h2>Stap 2: Welke overheidsinstantie wil je om informatie vragen?</h2>
			<span>
				<p>Wob-verzoeken kunnen alleen bij overheidsinstanties worden</p>
				<PopupButton number="5" />
			</span>
			{errors.includes("selectedAuthority") && (
				<p id="smallError">
					Kies een instantie aan wie je je verzoek wilt sturen. Staat de instantie die je zoekt er niet bij? Vul deze
					dan handmatig in.
				</p>
			)}
			<form>
				<input
					size="50"
					id="searchBarAuthority"
					type="search"
					value={searchValue}
					placeholder="Zoek op naam of plaats"
					onChange={event => setSearchValue(event.target.value)}
				/>

				{value.selectedAuthority ? (
					<div className="selectedAuthority">
						<p>Controleer de instantie aan wie je Wobt:</p>
						<h3>{value.selectedAuthority.naam}</h3>
						<p>{value.selectedAuthority.url}</p>
						<br />
						{value.selectedAuthority.adres ? (
							<p>
								{value.selectedAuthority.adres.postbus ??
									value.selectedAuthority.adres.straat + " " + value.selectedAuthority.adres.huisnummer}
							</p>
						) : (
							<p>
								Er is helaas geen adres bekend bij ons, beschik je zelf wel over een adres van deze instantie, dan kun
								je het invoeren zodra je de brief als .doc hebt gedownload
							</p>
						)}
						<p>{value.selectedAuthority.adres.postcode + " " + value.selectedAuthority.adres.plaats}</p>
						<p>{value.selectedAuthority.value}</p>
						<div>
							<button
								className="buttonStyle"
								type="button"
								onClick={() => {
									setSearchValue("");
									clickHandlerClearSelectedAuthority(value.selectedAuthority);
								}}
							>
								Zoek opnieuw
							</button>
						</div>
					</div>
				) : (
					<ul id="authorities">
						{authorities
							.filter(
								item =>
									item.naam.toLowerCase().includes(searchValue.toLowerCase()) ||
									item.adres?.plaats?.toLowerCase().includes(searchValue.toLowerCase()) ||
									item.types.some(type => type.toLowerCase().includes(searchValue.toLowerCase()))
							)
							.map(item => (
								<li key={item.systemid}>
									<button type="button" onClick={() => clickHandlerAuthority(item)}>
										<p>{item.naam}</p>
										<p>{item.postAdres?.plaats || item.bezoekAdres?.plaats}</p>
										<p>{item.types}</p>
										<FontAwesomeIcon className="fontIcon" icon={faPlus} />
									</button>
								</li>
							))}
					</ul>
				)}
				<div>
					<span>
						<p>Staat de juiste instantie er niet tussen maar beschik je zelf wel over de juiste gegevens?</p>
						<PopupButton number="16" />
					</span>
					<button
						className="buttonStyle"
						type="button"
						value="true"
						onClick={event => setManualAuthority(event.target.value)}
					>
						Vul dan hier de gegevens in
					</button>
				</div>
			</form>
			{manualAuthority && <SetSelectedAuthorityManual value={value} clickHandlerAuthority={clickHandlerAuthority} />}
			<span>
				<p>Hoe kies ik de juiste overheidsinstantie?</p>
				<PopupButton number="6" />
			</span>
			<span className="lastOfType">
				<p>Aan wie adresseer ik mijn verzoek?</p>
				<PopupButton number="7" />
			</span>
			<Link to="/Stap1">Terug</Link>

			<Link
				to="/Stap3"
				onClick={event => {
					let errors = [];

					if (value.selectedAuthority === null) {
						errors.push("selectedAuthority");
					}

					if (errors.length) {
						event.preventDefault();
						setErrors(errors);
					}
				}}
			>
				Stap 3
			</Link>
		</div>
	);
}
export default Stap2;
