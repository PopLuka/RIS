package si.feri.um.app;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import si.feri.um.app.model.Potovanje;
import si.feri.um.app.repozitorij.PotovanjeRepozitorij;

import java.time.LocalDate;

@Configuration
public class ZacetniPodatki {

	@Bean
	ApplicationRunner zapolniPotovanja(PotovanjeRepozitorij repozitorij) {
		return args -> {
			if (repozitorij.count() == 0) {
				repozitorij.save(new Potovanje("Poletje na Hrvaškem", "Makarska",
						LocalDate.of(2026, 7, 11), LocalDate.of(2026, 7, 18), "Plaža, morje in metuljčki"));
				repozitorij.save(new Potovanje("Mestni izlet", "Praga",
						LocalDate.of(2026, 9, 4), LocalDate.of(2026, 9, 7), "Karlův most, grad in dobra kava"));
				repozitorij.save(new Potovanje("Alpski vikend", "Kranjska Gora",
						LocalDate.of(2026, 12, 12), LocalDate.of(2026, 12, 14), "Zimske športne aktivnosti"));
			}
		};
	}

}
