package si.feri.um.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PozdravKontroler {

	@GetMapping("/index")
	public String pozdrav() {
		return "Pozdrav iz Spring Boota!";
	}

}
