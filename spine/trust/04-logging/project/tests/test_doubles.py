from datetime import date

from pipeline import extract


def test_the_month_is_last_month():
    assert extract.month_to_process(date(2026, 11, 1)) == "2026-10"


def test_january_runs_december_of_last_year():
    assert extract.month_to_process(date(2027, 1, 4)) == "2026-12"


def test_month_rows_reads_only_the_folder_it_is_given(tmp_path, monkeypatch):
    (tmp_path / "catalogue.json").write_text('{"ETH-250": {"price": "9.95"}}')
    (tmp_path / "orders-2026-10-01.csv").write_text(
        "order_id,date,customer,sku,quantity\n"
        "ORD-1,2026-10-01,maya,ETH-250,2\n"
        "ORD-2,2026-10-01,omar,ETH-250,lots\n"
    )
    monkeypatch.setattr(extract, "RAW", tmp_path)
    rejected = []
    rows = list(extract.month_rows(rejected))
    assert [row["order_id"] for row in rows] == ["ORD-1"]
    reason = ("orders-2026-10-01.csv", "ORD-2", "bad quantity 'lots'")
    assert rejected == [reason]
