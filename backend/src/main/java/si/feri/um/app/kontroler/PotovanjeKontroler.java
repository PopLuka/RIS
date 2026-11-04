package si.feri.um.app.kontroler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import si.feri.um.app.model.Potovanje;
import si.feri.um.app.storitev.PotovanjeStoritev;

import java.util.List;

@RestController
@RequestMapping("/api/potovanja")
public class PotovanjeKontroler {

	private final PotovanjeStoritev storitev;

	public PotovanjeKontroler(PotovanjeStoritev storitev) {
		this.storitev = storitev;
	}

	@GetMapping
	public List<Potovanje> vsa() {
		return storitev.vrniVsa();
	}

	@GetMapping("/{id}")
	public Potovanje ena(@PathVariable Long id) {
		return storitev.vrniZId(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Potovanje ustvari(@RequestBody Potovanje potovanje) {
		return storitev.ustvari(potovanje);
	}

	@PutMapping("/{id}")
	public Potovanje posodobi(@PathVariable Long id, @RequestBody Potovanje potovanje) {
		return storitev.posodobi(id, potovanje);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void izbrisi(@PathVariable Long id) {
		storitev.izbrisi(id);
	}

}
