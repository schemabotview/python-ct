"""Everything the pipeline refuses, as one family of exceptions."""


class PipelineError(Exception):
    """Something the pipeline refused: the parent of all its errors."""


class InvalidRow(PipelineError):
    """A row with a missing or malformed field."""


class UnknownProduct(PipelineError):
    """A row naming a product the catalogue does not sell."""

    def __init__(self, row_id: str, sku: str) -> None:
        super().__init__(f"{row_id}: unknown product {sku}")
        self.sku = sku
