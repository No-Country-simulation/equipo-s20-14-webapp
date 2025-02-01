package org.project.app.dto.category;

import java.io.Serializable;

public record CategoryDto(
    Long id,
    String name
) implements Serializable {
}
