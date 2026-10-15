package si.feri.um.app.repozitorij;

import org.springframework.data.jpa.repository.JpaRepository;
import si.feri.um.app.model.Potovanje;

public interface PotovanjeRepozitorij extends JpaRepository<Potovanje, Long> {
}
