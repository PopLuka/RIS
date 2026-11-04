package si.feri.um.app.storitev;

import org.springframework.stereotype.Service;
import si.feri.um.app.model.Potovanje;
import si.feri.um.app.repozitorij.PotovanjeRepozitorij;

import java.util.List;

@Service
public class PotovanjeStoritev {

	private final PotovanjeRepozitorij repozitorij;

	public PotovanjeStoritev(PotovanjeRepozitorij repozitorij) {
		this.repozitorij = repozitorij;
	}

	public List<Potovanje> vrniVsa() {
		return repozitorij.findAll();
	}

	public Potovanje vrniZId(Long id) {
		return repozitorij.findById(id)
				.orElseThrow(() -> new PotovanjeNiBiloNajdenoIzjema(id));
	}

	public Potovanje ustvari(Potovanje potovanje) {
		potovanje.setId(null);
		return repozitorij.save(potovanje);
	}

	public Potovanje posodobi(Long id, Potovanje posodobljeno) {
		Potovanje obstojece = vrniZId(id);
		obstojece.setIme(posodobljeno.getIme());
		obstojece.setCilj(posodobljeno.getCilj());
		obstojece.setDatumZacetka(posodobljeno.getDatumZacetka());
		obstojece.setDatumZakljucka(posodobljeno.getDatumZakljucka());
		obstojece.setOpis(posodobljeno.getOpis());
		return repozitorij.save(obstojece);
	}

	public void izbrisi(Long id) {
		if (!repozitorij.existsById(id)) {
			throw new PotovanjeNiBiloNajdenoIzjema(id);
		}
		repozitorij.deleteById(id);
	}

}
