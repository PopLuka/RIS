package si.feri.um.app.storitev;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PotovanjeNiBiloNajdenoIzjema extends RuntimeException {

	public PotovanjeNiBiloNajdenoIzjema(Long id) {
		super("Potovanje z id " + id + " ne obstaja.");
	}

}
