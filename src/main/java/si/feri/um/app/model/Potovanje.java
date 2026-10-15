package si.feri.um.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "potovanja")
public class Potovanje {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String ime;
	private String cilj;
	private LocalDate datumZacetka;
	private LocalDate datumZakljucka;
	private String opis;

	public Potovanje() {
	}

	public Potovanje(String ime, String cilj, LocalDate datumZacetka, LocalDate datumZakljucka, String opis) {
		this.ime = ime;
		this.cilj = cilj;
		this.datumZacetka = datumZacetka;
		this.datumZakljucka = datumZakljucka;
		this.opis = opis;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getCilj() {
		return cilj;
	}

	public void setCilj(String cilj) {
		this.cilj = cilj;
	}

	public LocalDate getDatumZacetka() {
		return datumZacetka;
	}

	public void setDatumZacetka(LocalDate datumZacetka) {
		this.datumZacetka = datumZacetka;
	}

	public LocalDate getDatumZakljucka() {
		return datumZakljucka;
	}

	public void setDatumZakljucka(LocalDate datumZakljucka) {
		this.datumZakljucka = datumZakljucka;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

}
